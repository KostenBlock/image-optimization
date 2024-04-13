export default function myImageLoader({ src, width, quality }) {
    return `https://storage.yandexcloud.net/t2v-storage/images/${src}/w${width}.webp`
};