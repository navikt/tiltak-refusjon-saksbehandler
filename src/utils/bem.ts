export interface BEMWrapper {
    className: string;
    element: (e?: string, m?: string) => string;
    modifier: (m?: string) => string;
}

const bem: (cls: string) => BEMWrapper = (cls: string) => ({
    className: cls,
    element: (e?: string, m?: string) => `${cls}__${e}${m ? ` ${cls}__${e}--${m}` : ''}`,
    modifier: (m?: string) => `${cls}--${m}`,
});

export default bem;
