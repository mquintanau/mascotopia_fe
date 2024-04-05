
import PetInfoBox from "../PetInfoBox/PetInfoBox";


const PetView = () => {
    return ( 
        <div className="text-black font-semibold items-start">
            <p className="flex justify-start py-1 px-4">Pet</p>
            <PetInfoBox />
        </div>
     );
}
 
export default PetView;