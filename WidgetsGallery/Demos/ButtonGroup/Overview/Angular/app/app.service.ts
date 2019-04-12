import { Injectable } from '@angular/core';

export class Alignment {
    icon: string;
    alignment: string;
}

export class FontStyle {
    icon: string;
    style: string;
}

let alignments: Alignment[] = [
    {
        icon: "alignleft",
        alignment: "left"
    },
    {
        icon: "aligncenter",
        alignment: "center"
    },
    {
        icon: "alignright",
        alignment: "right"
    },
    {
        icon: "alignjustify",
        alignment: "justify"
    }
];

let fontStyle: FontStyle[] = [
    {
        icon: "bold",
        style: "bold"
    },
    {
        icon: "italic",
        style: "italic"
    },
    {
        icon: "underline",
        style: "underline"
    },
    {
        icon: "strike",
        style: "strike"
    }
];

@Injectable()
export class Service {
    getAlignments() : Alignment[] {
        return alignments;
    }

    getFontStyles() : FontStyle[] {
        return fontStyle;
    }
}
