import React from 'react';
interface RowProps{
    children:React.ReactNode;
    extrsRowCss:string;
}
const Tr = ({children,extrsRowCss}:RowProps) => {
    return (
        <tr className={`${extrsRowCss} border border-slate-300`}>
            {children}
        </tr>
    );
};

export default Tr;