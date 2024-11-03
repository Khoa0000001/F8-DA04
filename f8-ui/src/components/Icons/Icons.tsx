export const SearchIcon = ({
    width = '36',
    height = '36',
    className = '',
}: {
    width: string;
    height: string;
    className: string;
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Search-Icon"
        className={className}
        width={width}
        height={height}
        viewBox="0 0 36 36"
    >
        <path
            id="Path_127042"
            data-name="Path 127042"
            d="M35.4,32.5l-8.252-8.3A14.488,14.488,0,0,0,5.451,5.107,14.478,14.478,0,0,0,24.2,27.075l8.263,8.314A2.061,2.061,0,0,0,35.4,32.5ZM5.344,15.479A10.327,10.327,0,1,1,15.671,25.764,10.306,10.306,0,0,1,5.344,15.479Z"
            transform="translate(-1.103 -0.969)"
            fill="#444"
        />
    </svg>
);

export const SearchResultIcon = ({
    width = '36',
    height = '36',
    className = '',
}: {
    width: string;
    height: string;
    className: string;
}) => (
    <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="magnifying-glass"
        className={className}
        width={width}
        height={height}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
    >
        <path
            fill="currentColor"
            d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
        ></path>
    </svg>
);

export const ClearIcon = ({
    width = '36',
    height = '36',
    className = 'svg-inline--fa fa-xmark ',
}: {
    width: string;
    height: string;
    className: string;
}) => (
    <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="xmark"
        className={className}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
    >
        <path
            fill="currentColor"
            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
        ></path>
    </svg>
);

export const NotificationIcon = ({
    width = '36',
    height = '36',
    className = '',
}: {
    width: string;
    height: string;
    className: string;
}) => (
    <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="bell"
        className={'svg-inline--fa fa-bell' + ' ' + className}
        width={width}
        height={height}
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
    >
        <path
            fill="currentColor"
            d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z"
        ></path>
    </svg>
);

export const NewFeed = () => (
    <svg viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M15,15.6L13,14H4V10H13L15,8.4V15.6M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z"
        ></path>
    </svg>
);
