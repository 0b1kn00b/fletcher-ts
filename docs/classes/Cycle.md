[**fletcher-ts**](../README.md) • **Docs**

***

[fletcher-ts](../globals.md) / Cycle

# Class: Cycle

## Constructors

### new Cycle()

> **new Cycle**(`_after`: () => `Promise`\<[`Cycle`](Cycle.md)\>): [`Cycle`](Cycle.md)

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `_after` | () => `Promise`\<[`Cycle`](Cycle.md)\> |
  

</details

#### Returns

[`Cycle`](Cycle.md)

#### Source

core/Cycle.ts:5

## Properties

### \_after()

> `private` **\_after**: () => `Promise`\<[`Cycle`](Cycle.md)\> = `null`

#### Returns

`Promise`\<[`Cycle`](Cycle.md)\>

#### Source

core/Cycle.ts:4

***

### ZERO

> `static` **ZERO**: [`Cycle`](Cycle.md)

#### Source

core/Cycle.ts:105

## Accessors

### after

> `get` **after**(): `Promise`\<[`Cycle`](Cycle.md)\>

#### Returns

`Promise`\<[`Cycle`](Cycle.md)\>

#### Source

core/Cycle.ts:6

## Methods

### par()

> **par**(`rhs`: [`Cycle`](Cycle.md)): [`Cycle`](Cycle.md)

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `rhs` | [`Cycle`](Cycle.md) |
  

</details

#### Returns

[`Cycle`](Cycle.md)

#### Source

core/Cycle.ts:33

***

### seq()

> **seq**(`rhs`: [`Cycle`](Cycle.md)): [`Cycle`](Cycle.md)

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `rhs` | [`Cycle`](Cycle.md) |
  

</details

#### Returns

[`Cycle`](Cycle.md)

#### Source

core/Cycle.ts:30

***

### submit()

> **submit**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

#### Source

core/Cycle.ts:36

***

### Par()

> `static` **Par**(`self`: [`Cycle`](Cycle.md), `that`: [`Cycle`](Cycle.md)): [`Cycle`](Cycle.md)

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `self` | [`Cycle`](Cycle.md) |
| `that` | [`Cycle`](Cycle.md) |
  

</details

#### Returns

[`Cycle`](Cycle.md)

#### Source

core/Cycle.ts:72

***

### Pure()

> `static` **Pure**(`self`: `Promise`\<[`Cycle`](Cycle.md)\>): [`Cycle`](Cycle.md)

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `self` | `Promise`\<[`Cycle`](Cycle.md)\> |
  

</details

#### Returns

[`Cycle`](Cycle.md)

#### Source

core/Cycle.ts:109

***

### Seq()

> `static` **Seq**(`lhs`: [`Cycle`](Cycle.md), `rhs`: [`Cycle`](Cycle.md)): [`Cycle`](Cycle.md)

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `lhs` | [`Cycle`](Cycle.md) |
| `rhs` | [`Cycle`](Cycle.md) |
  

</details

#### Returns

[`Cycle`](Cycle.md)

#### Source

core/Cycle.ts:8

***

### Submit()

> `static` **Submit**(`self`: [`Cycle`](Cycle.md)): `Promise`\<`unknown`\>

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `self` | [`Cycle`](Cycle.md) |
  

</details

#### Returns

`Promise`\<`unknown`\>

#### Source

core/Cycle.ts:40
