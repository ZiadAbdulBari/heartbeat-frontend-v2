import React from 'react';
interface DataProps{
    children:React.ReactNode;
    extrsColCss:string;
}
const Td = ({children,extrsColCss}:DataProps) => {
    return (
        <td className={`${extrsColCss}`}>{children}</td>
    );
};

export default Td;