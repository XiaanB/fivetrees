import React from 'react';
import { ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router'; 
import { FontAwesome } from '@expo/vector-icons';

import howitworks3 from '../../../../assets/images/Howitworks2.jpg';
import HowItWorksImage2 from '../../../../assets/images/Howitworks3.jpg';
import HowItWorksImage4 from '../../../../assets/images/Howitworks4.jpg';
import HowItWorksImage5 from '../../../../assets/images/Howitworks5.jpg';

const Educational = () => {
    const router = useRouter(); 

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9', padding: 20 }}>
            {/* 🌱 Section 1: Introduction */}
            <MotiView
                from={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', duration: 800 }}
                style={{ marginBottom: 20 }}
            >
                <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#4CAF50' }}>
                    Why Choose Eco-Friendly Hand Wash?
                </Text>
                <Text style={{ fontSize: 16, marginTop: 10, textAlign: 'center' }}>
                    Traditional liquid soaps come in plastic bottles that contribute to environmental waste.
                    Five Trees' hand wash tablets offer a **sustainable**, **waste-free**, and **natural** way
                    to keep your hands clean.
                </Text>
            </MotiView>

            {/* 🧴 Section 2: How It Works */}
            <MotiView
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 800, delay: 200 }}
                style={{ padding: 15, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3, marginBottom: 20 }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>How It Works</Text>
                <Image
                    source={HowItWorksImage2} // Adjust the path to your images
                    style={{ width: '75%', height: 400, borderRadius: 10, position: 'center', alignSelf: 'center' }}
                    resizeMode="cover"
                />
                <Image
                    source={howitworks3}
                    style={{ width: '75%', height: 400, borderRadius: 10, position: 'center', alignSelf: 'center' }}
                    resizeMode="cover"
                />
                <Image
                    source={HowItWorksImage4}
                    style={{ width: '75%', height: 400, borderRadius: 10, position: 'center', alignSelf: 'center' }}
                    resizeMode="cover"
                />
                <Image
                    source={HowItWorksImage5}
                    style={{ width: '75%', height: 400, borderRadius: 10, position: 'center', alignSelf: 'center' }}
                    resizeMode="cover"
                />

                <Text style={{ fontSize: 16, marginTop: 10 }}>
                    1️⃣ Fill a reusable soap dispenser with warm water.{"\n"}
                    2️⃣ Drop in one Five Trees hand wash tablet.{"\n"}
                    3️⃣ Let it dissolve and start using your new hand wash!
                </Text>
            </MotiView>

            {/* ✅ Section 3: Benefits */}
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', duration: 800, delay: 400 }}
                style={{ marginBottom: 20 }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Benefits of Five Trees Hand Wash</Text>
                <Text style={{ fontSize: 16 }}>✅ Zero Plastic Waste</Text>
                <Text style={{ fontSize: 16 }}>✅ Natural Ingredients</Text>
                <Text style={{ fontSize: 16 }}>✅ Vegan & Cruelty-Free</Text>
                <Text style={{ fontSize: 16 }}>✅ Cost-Effective & Long-Lasting</Text>
            </MotiView>

            {/* ❓ Section 4: FAQs */}
            <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 800, delay: 600 }}
                style={{ backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 3 }}
            >
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>FAQs</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🤔 Do these tablets work with any dispenser?</Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Yes! They dissolve easily in any standard soap dispenser.</Text>

                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🤔 Are they safe for sensitive skin?</Text>
                <Text style={{ fontSize: 16, marginBottom: 10 }}>Absolutely! Our formula is free from harsh chemicals.</Text>

                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>🤔 How long does one tablet last?</Text>
                <Text style={{ fontSize: 16 }}>One tablet makes 250ml of liquid soap, which lasts as long as a regular bottle.</Text>
            </MotiView>
        </ScrollView>
    );
};

export const options = {
    title: 'Educational Information',
    headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 15 }}>
            <FontAwesome name="bars" size={24} color="black" />
        </TouchableOpacity>
    ),
};

export default Educational;



