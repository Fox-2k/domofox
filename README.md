# DomoFox [![pipeline status](https://gitlab.com/Fox2k/domofox/badges/main/pipeline.svg)](https://gitlab.com/Fox2k/domofox/-/commits/main) [![coverage report](https://gitlab.com/Fox2k/domofox/badges/main/coverage.svg)](https://gitlab.com/Fox2k/domofox/-/commits/main)

An home thermostat project, intended to run into Raspberry pi with a 7" screen

# Overview

## Working modes

Domofox can work in 4 modes:
 * OFF mode: switch the heater off
 * MANUAL mode: Regulate according the 'manual' setpoint defined and the ambiant temperature
 * AUTOMATIC mode: Same as manual mode, except it regulating according the 'auto' setpoint, which is updated according the planning you defined
 * FORCED mode: Useful when you want to manually change the temperature setpoint once, but keeping the automatic mode on so the next automatic setpoint will apply and reset your device in AUTO mode

## Customized ambiant temperature

The ambiant temperature used to regulate is computed as a weighted average of your sensors value. Thus you can adapt sensor influence into the regulation.

Providing you use an existing driver code, or develop your own, you can use any kind of sensor

# Architecture

## Client

VueJS interface to do

## API

This is the core engine of Domofox temperature regulation

# Installation
To do

# Usage
To do

# Contributing
To do

# License
To do

