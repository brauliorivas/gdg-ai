export function Logo(){
    return(
        <div className="flex p-2 items-center justify-center ">
            <table>
                <tbody>
                <tr>
                    <td className="pt-1 pl-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell1"></div>
                    </td>
                    <td className="pt-1 pl-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell1"></div>
                    </td>
                    <td className="pt-1 pl-1 pr-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell2"></div>
                    </td>
                </tr>
                <tr>
                    <td className="pt-1 pl-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell1"></div>
                    </td>
                    <td className="pt-1 pl-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell2"></div>
                    </td>
                    <td className="pt-1 pl-1 pr-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell"></div>
                    </td>
                </tr>
                <tr>
                    <td className="pt-1 pl-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell2"></div>
                    </td>
                    <td className="pt-1 pl-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell"></div>
                    </td>
                    <td className="pt-1 pl-1 pr-1">
                        <div className="h-3 w-3 bg-black dark:bg-white table-cell"></div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="h-12 bg-slate-500 w-[2px]" > </div>
            <p className="text-[40px] font-extrabold text-white dark:text-[rgb(252,118,00)]"> El Puente</p>
        </div>
    );
}