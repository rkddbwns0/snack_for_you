import { MainSwiper } from '../component/main-swiper.tsx';

export const Main = () => {
    return (
        <div className="page-wrapper">
            <div className="content-box">
                <div style={{ paddingTop: 'calc(10vmin)' }}>
                    <MainSwiper />
                </div>
            </div>
        </div>
    );
};
