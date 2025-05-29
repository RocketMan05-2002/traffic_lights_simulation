

export default function Cell({ filled }){
    return <button 
        type="button"
        className={filled? "cell cell-activated":"cell"}
    />
}