[**fletcher-ts**](../README.md) • **Docs**

***

[fletcher-ts](../globals.md) / Terminal

# Class: Terminal\<R\>

Terminal represents the contiuation passed through the Arrowlets to run them

 Terminal

## Implements

## Template

## Extends

- `Settler`\<[`TerminalInput`](../type-aliases/TerminalInput.md)\<`R`\>\>

## Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `R` |  |
  

</details

## Constructors

### new Terminal()

> **new Terminal**\<`R`\>(`_apply`: (`a`: [`Apply`](Apply.md)\<[`TerminalInput`](../type-aliases/TerminalInput.md)\<`R`\>, [`Cycle`](Cycle.md)\>) => [`Cycle`](Cycle.md)): [`Terminal`](Terminal.md)\<`R`\>

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `_apply` | (`a`: [`Apply`](Apply.md)\<[`TerminalInput`](../type-aliases/TerminalInput.md)\<`R`\>, [`Cycle`](Cycle.md)\>) => [`Cycle`](Cycle.md) |
  

</details

#### Returns

[`Terminal`](Terminal.md)\<`R`\>

#### Inherited from

`Settler<TerminalInput<R>>.constructor`

#### Source

core/Apply.ts:5

## Methods

### apply()

> **apply**(`a`: [`Apply`](Apply.md)\<[`TerminalInput`](../type-aliases/TerminalInput.md)\<`R`\>, [`Cycle`](Cycle.md)\>): [`Cycle`](Cycle.md)

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `a` | [`Apply`](Apply.md)\<[`TerminalInput`](../type-aliases/TerminalInput.md)\<`R`\>, [`Cycle`](Cycle.md)\> |
  

</details

#### Returns

[`Cycle`](Cycle.md)

#### Inherited from

`Settler.apply`

#### Source

core/Apply.ts:6

***

### receive()

> **receive**(`receiver`: `Receiver`\<`R`\>): [`Cycle`](Cycle.md)

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `receiver` | `Receiver`\<`R`\> |
  

</details

#### Returns

[`Cycle`](Cycle.md)

#### Source

core/Terminal.ts:23

***

### Pure()

> `static` **Pure**\<`R`\>(`deferred`: `Deferred`\<`Result`\<`R`\>\>): [`Terminal`](Terminal.md)\<`R`\>

#### Type parameters

<details>  

| Type parameter |
| :------ |
| `R` |
  

</details

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `deferred` | `Deferred`\<`Result`\<`R`\>\> |
  

</details

#### Returns

[`Terminal`](Terminal.md)\<`R`\>

#### Source

core/Terminal.ts:78

***

### error()

> `static` **error**\<`R`\>(`self`: `Error`): `Receiver`\<`R`\>

#### Type parameters

<details>  

| Type parameter |
| :------ |
| `R` |
  

</details

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `self` | `Error` |
  

</details

#### Returns

`Receiver`\<`R`\>

#### Source

core/Terminal.ts:75

***

### issue()

> `static` **issue**\<`R`\>(`self`: `Result`\<`R`\>): `Receiver`\<`R`\>

#### Type parameters

<details>  

| Type parameter |
| :------ |
| `R` |
  

</details

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `self` | `Result`\<`R`\> |
  

</details

#### Returns

`Receiver`\<`R`\>

#### Source

core/Terminal.ts:60

***

### later()

> `static` **later**\<`R`\>(`payload`: `Promise`\<`Result`\<`R`\>\>): `Receiver`\<`R`\>

#### Type parameters

<details>  

| Type parameter |
| :------ |
| `R` |
  

</details

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `payload` | `Promise`\<`Result`\<`R`\>\> |
  

</details

#### Returns

`Receiver`\<`R`\>

#### Source

core/Terminal.ts:53

***

### value()

> `static` **value**\<`R`\>(`self`: `R`): `Receiver`\<`R`\>

#### Type parameters

<details>  

| Type parameter |
| :------ |
| `R` |
  

</details

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `self` | `R` |
  

</details

#### Returns

`Receiver`\<`R`\>

#### Source

core/Terminal.ts:72
