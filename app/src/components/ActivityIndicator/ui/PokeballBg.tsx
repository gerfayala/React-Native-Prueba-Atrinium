import { StyleProp, Image, ImageStyle } from 'react-native'
import React from 'react'

interface Props {
    style?: StyleProp<ImageStyle>;
}

const PokeballBg = ({style}:  Props) => {
    
    const pokeballImg = require('../../../../../assets/images/pokeball-dark.png');


  return (
    <Image 
        source={pokeballImg}
        style ={[
            {
                width: 300,
                height: 300,
                opacity: 0.3
                
            },
            style
        ]}
    
    />
    
  )
}

export default PokeballBg