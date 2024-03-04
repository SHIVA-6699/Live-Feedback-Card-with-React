
const Test=()=>{
    const name="Shiva krshna pilla"
    const newname=name.split(" ");
    const newarr=newname.map((item)=>{
        return item[0].toLocaleUpperCase().concat(item.slice(1));
    })
    console.log(newarr)
    return(
        <>
        </>
    )
}
export default Test