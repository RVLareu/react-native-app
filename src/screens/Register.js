import React, { useState } from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Image,
} from "react-native";
import {
    Layout,
    Text,
    TextInput,
    Button,
    useTheme,
    themeColor,
} from "react-native-rapi-ui";

export default function ({ navigation, setRegister, setLoggedIn, setAuth }) {
    const { isDarkmode, setTheme } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function register() {
    setLoading(true);
    fetch.post('https://tdp-backend-develop.onrender.com/register/',
    data= {
        "username": email,
        "password": password
    })
    .then((response)=> response.json())
    .then((response)=>{
        console.log(response)
        setLoading(false);
        setLoggedIn(true)
    })
    };

    return (
        <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
        <Layout>
            <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
            >
            <View
                style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
                }}
            >
                <Image
                resizeMode="contain"
                style={{
                    height: 220,
                    width: 220,
                }}
                source={require("../../assets/register.png")}
                />
            </View>
            <View
                style={{
                flex: 3,
                paddingHorizontal: 20,
                paddingBottom: 20,
                backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
                }}
            >
                <Text
                fontWeight="bold"
                size="h3"
                style={{
                    alignSelf: "center",
                    padding: 30,
                }}
                >
                Register
                </Text>
                <Text>Email</Text>
                <TextInput
                containerStyle={{ marginTop: 15 }}
                placeholder="Enter your email"
                value={email}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                />

                <Text style={{ marginTop: 15 }}>Password</Text>
                <TextInput
                containerStyle={{ marginTop: 15 }}
                placeholder="Enter your password"
                value={password}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                />
                <Button
                text={loading ? "Loading" : "Create an account"}
                onPress={() => {
                    register();
                }}
                style={{
                    marginTop: 20,
                }}
                disabled={loading}
                />

                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
                    justifyContent: "center",
                }}
                >
                <Text size="md">Already have an account?</Text>
                <TouchableOpacity
                    onPress={() => {
                        setLoggedIn(false)
                        setRegister(false)
                    // navigation.navigate("Login");
                    }}
                >
                    <Text
                    size="md"
                    fontWeight="bold"
                    style={{
                        marginLeft: 5,
                    }}
                    >
                    Login here
                    </Text>
                </TouchableOpacity>
                </View>
                <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 30,
                    justifyContent: "center",
                }}
                >
                <TouchableOpacity
                    onPress={() => {
                    isDarkmode ? setTheme("light") : setTheme("dark");
                    }}
                >
                    <Text
                    size="md"
                    fontWeight="bold"
                    style={{
                        marginLeft: 5,
                    }}
                    >
                    {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </Layout>
        </KeyboardAvoidingView>
    );
}