import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Constants from 'expo-constants';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

var segundero = 1; //Lleva la cuenta de los segundos dentro de la aplicación después de construir la figura
var timer; //Lleva el control de la funcion asincrona del timer
var { height } = Dimensions.get('window'); //Calcula la dimensiones de la pantalla con la finalidad de dividirla en 3 de forma equivalente
var box_count = 3; //La cantidad en la que se va a dividir la pantalla
var box_height = height / box_count;
const image = { uri: 'http://wallpaperaccess.com/full/459246.jpg' }; //Es la imagen que se carga como background de la pantalla
const App = () => {
  //Es el main el cual esta programado como un arrow function
  const [simbolo, setSimbolo] = useState('+'); //tenemos un estado el cual almacena el simbolo seleccionado por el usuario
  const [cantidad, setCantidad] = useState(''); //tenemos un estado el cual almacena la cantidad de pisos de la figura
  const [counter, setCounter] = useState(1); //Este contador es el estado que se va actualizando en pantalla en tiempo real en el cronómetro
  const [figura, setfigura] = useState(`Cuadro de impresión`); //Almacena la figura creada, pero para poder mostrar la caja se dejo un texto default

var contador2 = 0;
  useEffect(() =>{
    const timer2 = setTimeout(contador2++,1000);
    
    return () => ( clearTimeout(timer2) )
  })
  //Callbackmemo
  useEffect(() => {

  })
  //Es el inicio de la funcion que inicia el contador de forma async.
  const startTimer = (estado) => {
    //El estado sirve para llevar el control del contador ya que es de forma async, ocupamos romper y dejar que siga de llamar el callback
    if (estado == 1) {
      //Esta función hace la tarea de contador e ir actualizando nuestro state count
      manageTimer();
      /*El siguiente setTimeout es el callback que llama la aplicación cada segundo para manejar el cronómetro, el cual tiene un if para protección del contador*/
      timer = setTimeout(
        () => (estado === 1 ? startTimer(1) : clearTimeout(timer)),
        1000
      );
    } else {
      /* El estado al ser diferente de uno quiere decir que debe reiniciar  el contador y el segundero, regresa el estado count a 1 para mostrar al usuario*/
      clearTimeout(timer);
      setCounter(1);
      segundero = 1;
    }
  };
  const manageTimer = () => {
    /* el segundero suma 1 y se lo asigna al estado*/
    segundero++;
    setCounter(segundero);
  };

  /* La función Limpiar lleva la tarea de borrar el estado de figura y el estado de count el cual regresa a la app 
    a la forma inicial y del mismo modo se reinicia el segundero.
  */
  const Limpiar = () => {
    clearTimeout(timer);
    setfigura('Cuadro de impresión');
    clearTimeout(timer);
    startTimer(2);
  };

  /*La función Imprimir tiene la tarea de crear la figura la cual tiene 2 parametros */
  const Imprimir = ({ simbolo, cantidad }) => {
    /* Casteamos la cantidad a entero ya que la recibimos en un inicio en string */
    cantidad = parseInt(cantidad);

    /* Para validar que solo se ingreso un numero >0 
      comprobamos que sea entero y mayor a cero
     */
    if (Number.isInteger(cantidad) && cantidad > 0) {
      /* Testeamos que simbolo contenga un solo simbolo, el cual en la interfaz se casteo para que solo pudiera ingresar un caracter */
      if (simbolo.length > 0) {
        /* Estado: es igual al numero de pisos * 2 menos 1 el cual nos da el resultado de la base 
          Vacio: La cantidad de espacios Vacios en un inicio
          figuraf: el cual va almacenar la figura final
        */
        let estado = cantidad * 2 - 1;
        let vacio = cantidad - 1;
        let figuraf = '';
        let i, j, n;

        /*Lleva el control de los pisos de la figura, si comenzara en 0 seria cantidad-1*/
        for (i = 1; i <= cantidad; i++) {
          /*Asigna los espacios desde el inicio de la pantalla si j fuera 0 seria cantidad - 1*/
          for (j = 1; j <= cantidad; j++) {
            figuraf += ' ';
          }
          /*Numero de simboloes
            Ejemplo Pisos = 10
            ultimo piso = 2*i-1 (2*10-1 => 19)
          */
          for (j = 1; j <= 2 * i - 1; j++) {
            figuraf += simbolo;
          }
          //Final de linea le asigna salto de linea
          figuraf += '\n';
        }
        /* Por seguridad al counter comprobamos que siga en uno, asigandole el valor
          al estado figura se manda la figura creada
          y comienza a correr el cronometro en segundo
         */
        setCounter(1);
        setfigura(figuraf);
        startTimer(1);
      } else {
        /*Por si no mete nada el usuario*/
        alert('Debes ingresar solamente un simbolo');
      }
    } else {
      /* Si ingresa un número = a 0 o simplemente ingresa algo ajeno a un número*/
      alert(`Ingresaste ${cantidad} tiene que ser un número mayor a 0`);
    }
  };

  return (
    <ImageBackground source={image} style={styles.container}>
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.paragraph}>Indica el SÍmbolo y el tamaño</Text>
          {/*Almacena el simbolo y lo asigna al estado */}
          <TextInput
            style={styles.insimbolo}
            label="Símbolo"
            mode="outlined"
            maxLength={1}
            theme={{
              colors: {
                text: 'white',
                primary: 'rgb(247, 84, 49)',
                placeholder: 'white',
                underlineColor: 'transparent',
                background: 'gray',
              },
            }}
            value={simbolo}
            onChangeText={(text) => setSimbolo(text)}
            placeholder="+"
          />
          {/*Almacena los pisos y lo asigna al estado */}
          <TextInput
            style={styles.incantidad}
            label="Cantidad"
            mode="outlined"
            keyboardType="phone-pad"
            value={cantidad}
            theme={{
              colors: {
                text: 'white',
                primary: 'rgb(247, 84, 49)',
                placeholder: 'white',
                underlineColor: 'transparent',
                background: 'gray',
              },
            }}
            onChangeText={(text) => setCantidad(text)}
            placeholder=">=1"
          />
          {/*Boton para construir la figura e iniciar el cronometro, todo boton tiene una propiedad onPress el cual espera el evento
          de ser presionado y llama la función Imprimir */}
          <Button
            style={styles.button}
            icon="printer-3d"
            mode="contained"
            theme={{ colors: { primary: 'rgb(247, 84, 49)' } }}
            onPress={() => Imprimir({ simbolo, cantidad })}>
            Imprimir
          </Button>
        </View>
        {/*En la siguiente parte de la pantalla que seria el box de enmedio, se imprime el estado de la figura o el mensaje por default
        si es que no hay figura
        */}
        <View style={styles.box}>
          <Text style={styles.paragraph}>{figura}</Text>
        </View>
        {/*En la footer o tercera caja se encuentra el boton limpiar y el segundero, el boton llama la funcion limpiar*/}
        <View style={styles.box}>
          <Text style={styles.paragraph}>TIMER</Text>
          <Card style={styles.card}>
            <Text style={styles.paragraph}>{counter}</Text>
          </Card>
          <Button
            style={styles.button}
            icon="close-circle-outline"
            mode="contained"
            theme={{ colors: { primary: 'rgb(247, 84, 49)' } }}
            onPress={() => Limpiar()}>
            Limpiar
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 40,
    padding: 20,
    opacity: 0.95,
  },
  box: {
    height: box_height,
  },
  incantidad: {
    margin: 5,
    width: 100,
    marginTop: -64,
    marginLeft: 150,
  },
  insimbolo: {
    marginLeft: 40,
    width: 100,
  },
  card: {
    opacity: 0.5,
    borderRadius: 50,
    marginTop:-20,
    width: 70,
    height: 70,
    marginLeft: 120,
    backgroundColor: '#B92505',
  },
  button: { margin: 5 },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});

export default App;
