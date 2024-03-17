import { Image, TouchableOpacity } from "react-native";

const ImageButton = ({onPress, imageStyle, imageSource}) => {
    return (
        <TouchableOpacity style={imageStyle} onPress={onPress}>
            <Image style={imageStyle} source={imageSource}></Image>
        </TouchableOpacity>
    );
};

export default ImageButton;