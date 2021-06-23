import Base from "./Base";

export default function BaseOpened() {
    const baseLightbox = Base();
    baseLightbox.open();

    return baseLightbox;
}