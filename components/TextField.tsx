// components/TextField.tsx
import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextInput, View, Text, StyleSheet } from "react-native";

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address";
};

export default function TextField({
  name,
  control,
  label,
  placeholder,
  secureTextEntry,
  keyboardType = "default",
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={{ marginBottom: 18 }}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#a0a0d0"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            style={[styles.input, error && styles.inputError]}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}
/*estilos de la pagina*/
const styles = StyleSheet.create({
  label: {
    color: "#dcdcff",
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#2a2a72",
    borderRadius: 10,
    color: "white",
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  error: {
    color: "#ff6b6b",
    marginTop: 4,
    fontSize: 12,
  },
});
