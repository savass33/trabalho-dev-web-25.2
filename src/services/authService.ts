// src/services/authService.ts

export async function loginService(matricula: string, senha: string) {
  // Simulação de requisição à API
  if (matricula === "2410432" && senha === "unifor123") {
    return {
      token: "fake-jwt-token-123",
      user: {
        nome: "Savas Constantin",
        matricula: "2410432",
      },
    };
  } else {
    throw new Error("Matrícula ou senha inválida");
  }
}
