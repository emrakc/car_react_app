import { useState, useEffect } from 'react';
import { CarEntity } from '../domain/CarEntity';
import fakeData from './data.json'

let data = [...fakeData]; 
 
 
export function getCarList(): Promise<CarEntity[]> {
    return new Promise((res) => setTimeout(() => {
        res(data.filter((item:any)=>isCar(item))as CarEntity[])
    }, 450));
}

export function getCar(id: string): Promise<CarEntity> {
    return new Promise((res) => setTimeout(() => {
        let car = data.find((car: any) => car.id === Number.parseInt(id))
        if (isCar(car))
            res(car as CarEntity)
        else
            throw Error("the car do not exist");
    }, 450));
}

export function putCar(editCarData: CarEntity): Promise<CarEntity> {
    return new Promise((res) => setTimeout(() => { 
        let carIndex = data.findIndex((car: any) => car.id === editCarData.id)
        if (carIndex>=0) {
            data[carIndex]=editCarData
            res(editCarData)
        }
        else
            throw Error("the car do not exist");
    }, 450));
}
 
const isCar=(object: unknown)=>{
    return Object.prototype.hasOwnProperty.call(object, "id")
        && Object.prototype.hasOwnProperty.call(object, "color")
        && Object.prototype.hasOwnProperty.call(object, "carId")
        && Object.prototype.hasOwnProperty.call(object, "hp")
        && Object.prototype.hasOwnProperty.call(object, "price")
        && Object.prototype.hasOwnProperty.call(object, "inStock")
}
 