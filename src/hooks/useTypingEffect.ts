import { useState, useEffect } from 'react';

export const useTypingEffect = (texts: string[], typingSpeed: number = 100, deletingSpeed: number = 50, pauseDuration: number = 2000) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleTyping = () => {
            const currentFullText = texts[currentIndex];

            if (isDeleting) {
                setCurrentText(prev => prev.slice(0, -1));

                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
                }
            } else {
                setCurrentText(currentFullText.slice(0, currentText.length + 1));

                if (currentText === currentFullText) {
                    setTimeout(() => setIsDeleting(true), pauseDuration);
                    return;
                }
            }
        };

        const timer = setTimeout(
            handleTyping,
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

    return currentText;
};

export default useTypingEffect;
