import { Inntektsgrunnlag } from './../refusjon/refusjon';
export const formatterPenger = (penger: number) =>
    `${new Intl.NumberFormat('nb-NO', {
        style: 'decimal',
        maximumFractionDigits: 2,
    }).format(penger)} kr`;

export const summerInntektsgrunnlag = (inntektsgrunnlag?: Inntektsgrunnlag) =>
    inntektsgrunnlag ? inntektsgrunnlag.inntekter.map((ilinje) => ilinje.beløp).reduce((a, b) => a + b, 0) : 0;
