
import classNames from 'classnames';
import { useState, forwardRef, ImgHTMLAttributes } from 'react';
import images from '~/assets/images';
import styles from './Image.module.scss';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    fallback?: string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(({ src, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const hanldeError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || src}
            {...props}  
            onError={hanldeError}
        />
    );
});


export default Image;
