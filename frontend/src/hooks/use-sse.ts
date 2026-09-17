import { useState, useEffect, useRef, useCallback } from 'react';

type SSEStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export function useSSE(
  url: string | null,
  eventHandlers: Record<string, (data: any) => void> = {}
) {
  const [status, setStatus] = useState<SSEStatus>('disconnected');
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const reconnectAttempts = useRef(0);

  const connect = useCallback(() => {
    if (!url) return;

    setStatus('connecting');
    
    try {
      const eventSource = new EventSource(url);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        setStatus('connected');
        reconnectAttempts.current = 0;
      };

      eventSource.onerror = (error) => {
        console.error('SSE Error:', error);
        setStatus('error');
        eventSource.close();
        
        // Exponential backoff reconnect
        const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        reconnectAttempts.current += 1;
        
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, timeout);
      };

      // Register generic message handler if we want to catch all
      eventSource.onmessage = (event) => {
        if (eventHandlers['message']) {
          try {
            const data = JSON.parse(event.data);
            eventHandlers['message'](data);
          } catch (e) {
            eventHandlers['message'](event.data);
          }
        }
      };

      // Register named event handlers
      Object.entries(eventHandlers).forEach(([eventName, handler]) => {
        if (eventName === 'message') return; // Handled above
        
        eventSource.addEventListener(eventName, (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data);
            handler(data);
          } catch (e) {
            handler(event.data);
          }
        });
      });
    } catch (error) {
      setStatus('error');
    }
  }, [url, eventHandlers]);

  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    setStatus('disconnected');
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttempts.current = 0;
    connect();
  }, [connect, disconnect]);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { status, disconnect, reconnect };
}
