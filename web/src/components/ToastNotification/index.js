// components/Notification.jsx
import { useEffect } from 'react';
import styles from './ToastNotification.module.css';

const ToastNotification = ({ message, type, onClose, duration }) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    {type === 'success' ? '✓' : type === 'error' ? '✕' : '!'}
                </div>
                <div className={styles.message}>{message}</div>
            </div>
            <button className={styles.closeButton} onClick={onClose}>
                ×
            </button>
            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{ animationDuration: `${duration}ms` }}
                />
            </div>
        </div>
    );
};

export default ToastNotification;