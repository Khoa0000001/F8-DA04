/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

interface ButtonProps {
    to?: string;
    href?: string;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    rounded?: boolean;
    square?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    square = false,
    disabled = false,
    children,
    className,
    onClick,
    ...passProps
}: ButtonProps) {
    let Comp: any = 'button';

    const props: any = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props.onClick;
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className!]: className,
        primary,
        outline,
        text,
        disabled,
        rounded,
        square,
    });
    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
}

export default Button;
