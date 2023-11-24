import joblib
import sys


def predict_stock(cantidad, mes):
    # Cargar el modelo
    model = joblib.load("src/inventorypredictions/modelo_stock.pkl")

    # Convertir el mes a la misma codificación utilizada durante el entrenamiento
    encoded_month = label_encoder.transform([mes])[0]

    # Realizar la predicción
    prediction = model.predict([[cantidad, encoded_month]])

    print(prediction[0])


if __name__ == "__main__":
    # Obtener los argumentos desde Node.js
    cantidad = float(sys.argv[1])
    mes = sys.argv[2]

    predict_stock(cantidad, mes)
