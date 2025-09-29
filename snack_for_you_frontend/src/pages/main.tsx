import { AppHeader } from '../component/app-header.tsx';
import { MainSwiper } from '../component/main-swiper.tsx';
import { MenuBar } from '../component/menu-bar.tsx';

export const Main = () => {
    return (
        <div>
            <div style={{ paddingTop: 'calc(10vmin)' }}>
                <MainSwiper />
            </div>
        </div>
    );
};
