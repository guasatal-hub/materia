import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import TextField from "@/components/TextField";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema de validación con Zod
const schema = z.object({
  nombre: z.string().min(3, "Tu nombre debe tener al menos 3 letras"),
  correo: z
    .string()
    .email("Formato de correo inválido")
    .refine((v) => v.includes("@gmail.com"), {
      message: "Debe ser un correo de Gmail (@gmail.com)",
    }),
  contrasena: z
    .string()
    .min(6, "Mínimo 6 caracteres")
    .regex(/[A-Z]/, "Debe incluir al menos una mayúscula")
    .regex(/[0-9]/, "Debe incluir al menos un número"),
});

type FormValues = z.infer<typeof schema>;

export default function GmailConfig() {
  const { control, handleSubmit, watch, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { nombre: "", correo: "", contrasena: "" },
    mode: "onChange",
  });

  const password = watch("contrasena");
  const [secure, setSecure] = useState(true);

  // Medidor de seguridad
  const passwordStrength = (() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length > 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  })();

  const onSubmit = (data: FormValues) => {
    Alert.alert("✅ Gmail configurado correctamente", JSON.stringify(data, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración de Gmail</Text>

      <TextField
        name="nombre"
        control={control}
        label="Nombre completo"
        placeholder="Tu nombre"
      />

      <TextField
        name="correo"
        control={control}
        label="Correo Gmail"
        placeholder="ejemplo@gmail.com"
        keyboardType="email-address"
      />

      <TextField
        name="contrasena"
        control={control}
        label="Contraseña"
        placeholder="********"
        secureTextEntry={secure}
      />

      {/* Barra visual de seguridad */}
      {password ? (
        <View style={styles.strengthContainer}>
          <View
            style={[
              styles.strengthBar,
              { width: `${passwordStrength * 25}%` },
              passwordStrength <= 1
                ? { backgroundColor: "#ff6b6b" }
                : passwordStrength === 2
                ? { backgroundColor: "#f5c542" }
                : { backgroundColor: "#42f56c" },
            ]}
          />
          <Text style={styles.strengthText}>
            {passwordStrength <= 1
              ? "Contraseña débil 😕"
              : passwordStrength === 2
              ? "Contraseña media 😐"
              : "Contraseña fuerte 💪"}
          </Text>
        </View>
      ) : null}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        style={[styles.button, !formState.isValid && { opacity: 0.6 }]}
      >
        <Text style={styles.buttonText}>Guardar configuración</Text>
      </Pressable>

      <Text style={styles.footer}>
        🌟 Consejo: usa una contraseña segura con símbolos y números para ganar un punto extra 😄
      </Text>
    </View>
  );
}
/*Estilos */ 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e60",
    padding: 25,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
  },
  strengthContainer: {
    marginBottom: 16,
  },
  strengthBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff6b6b",
  },
  strengthText: {
    color: "#dcdcff",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#5b2cff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  footer: {
    color: "#bfbff5",
    fontSize: 12,
    textAlign: "center",
    marginTop: 16,
  },
});
