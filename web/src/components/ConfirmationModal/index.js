// components/ConfirmationModal.jsx
"use client";

import { useEffect } from 'react';
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmação",
    message = "Tem certeza que deseja realizar esta ação?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    type = "warning", // 'warning', 'danger', 'info', 'success'
}) => {
    // Fecha com ESC
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Previne scroll do body quando modal está aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    // Ícones para cada tipo
    const getIcon = () => {
        switch (type) {
            case 'danger':
                return '⚠️';
            case 'warning':
                return '⚠️';
            case 'success':
                return '✅';
            case 'info':
                return 'ℹ️';
            default:
                return '❓';
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContainer}>
                <div className={`${styles.modalContent} ${styles[type]}`}>
                    <div className={styles.modalHeader}>
                        <div className={styles.iconContainer}>
                            <span className={styles.icon}>{getIcon()}</span>
                        </div>
                        <h3 className={styles.title}>{title}</h3>
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Fechar"
                        >
                            ×
                        </button>
                    </div>

                    <div className={styles.modalBody}>
                        <p className={styles.message}>{message}</p>
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            className={`${styles.button} ${styles.cancelButton}`}
                            onClick={onClose}
                        >
                            {cancelText}
                        </button>
                        <button
                            className={`${styles.button} ${styles.confirmButton} ${styles[`confirm${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}
                            onClick={handleConfirm}
                            autoFocus
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;