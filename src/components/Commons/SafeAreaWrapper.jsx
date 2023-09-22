import React from 'react'
import { SafeAreaView } from 'react-native'

export const SafeAreaWrapper = (props) => {
    return (
        <SafeAreaView>
            {props.children}
        </SafeAreaView>
    )
}
