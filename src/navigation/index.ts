
import {
    createNativeStackNavigator,
    NativeStackScreenProps
} from '@react-navigation/native-stack';

export type RootStackParamList = {
    Gallery: undefined;
    Album: { albumId: number };
};

export type NavigationProps<
    S extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, S>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export {
    Stack,
}
