declare module 'swiper/react' {
    import type { ComponentType } from 'react';
    export const Swiper: ComponentType<any>;
    export const SwiperSlide: ComponentType<any>;
    export default Swiper;
}

declare module 'swiper/modules' {
    export const Navigation: any;
    export const Pagination: any;
    export const Autoplay: any;
    const _default: any;
    export default _default;
}

declare module 'swiper' {
    const _default: any;
    export default _default;
}
