import { useEffect, useRef, useState } from "react";

import classes from "./custom-image.module.scss";
import Image, { ImageLoaderProps } from "next/image";
interface AdditionalImageProps {
    format?: string;
    customWidth?: number;
}
interface Props {
    imageKey: string;
    format?: string;
    forcedPoint?: 800 | 1000 | 1500 | 2000 | 2500 | 4000;
    className?: string;
    loading?: "eager" | "lazy";
}
export default function  CustomImage({
    imageKey,
    format = "webp",
    forcedPoint,
    className = "",
    loading = "lazy"
}: Props) {
    const ref = useRef<HTMLDivElement>(null);

    const [point, setPoint] = useState<number | null>(null);
    const [containerWidth, setContainerWidth] = useState<number | null>(null);
    const [isRetina, setIsRetina] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setIsRetina(detectIos());
    }, []);

    useEffect(() => {
        if(isRetina === undefined || !ref.current) return;
        setContainerWidth(isRetina ? ref.current.clientWidth * 2 : ref.current.clientWidth);
    }, [ref.current, isRetina]);

    useEffect(() => {
        handlePoint();
    }, [forcedPoint, containerWidth]);

    const handlePoint = () => {
        if (forcedPoint || containerWidth === null) return;
        let tempIndex = 0;
        let difference = 4000;
        if (containerWidth > breakPoints[breakPoints.length - 1]){
            setPoint(breakPoints[breakPoints.length - 1]);
            return;
        }
        for (const [index, breakPoint] of breakPoints.entries()) {
            if (difference > Math.abs(breakPoint - containerWidth)) {
                difference = Math.abs(breakPoint - containerWidth);
                tempIndex = index;
            }
        }
        setPoint(breakPoints[tempIndex]);
    };

    return (
        <div
            ref={ref}
            className={`${classes.picture__container} ${className}`}
        >
            <Image
                src={imageKey}
                alt={"img"}
                fill={true}
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk4TlbDwACdwFmwoLwuAAAAABJRU5ErkJggg=="
                placeholder={"blur"}
                loading={loading}
                loader={({ width, src }) => {
                    if(forcedPoint) return myImageLoader({
                        src,
                        format,
                        width: forcedPoint
                    });
                    if(point === null) return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPk4TlbDwACdwFmwoLwuAAAAABJRU5ErkJggg==";
                    return myImageLoader({
                        src,
                        width: isRetina ? point : width,
                        format
                    });
                }}
            />
        </div>
    )
}

const breakPoints = [800, 1000, 1500, 2000, 2500, 4000];

function myImageLoader({ src, width, format }: ImageLoaderProps & AdditionalImageProps) {
    return `https://storage.yandexcloud.net/t2v-storage/images/${src}/w${width}.${format}`
}

function detectIos() {
    const toMatch = [
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /Macintosh/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
