import './style.scss'

const ColorBox = ({colorValue = ''} : any) => {
    return (
        <div className="color-box" style={{ backgroundColor: `${colorValue}` }}></div>
    )
}

export default ColorBox;