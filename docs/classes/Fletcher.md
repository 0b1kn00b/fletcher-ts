[**fletcher-ts**](../README.md) • **Docs**

***

[fletcher-ts](../globals.md) / Fletcher

# Class: Fletcher

Takes a resolver to use later that may return Cycle to be done in a scheduler once all inputs are known

## Constructors

### new Fletcher()

> **new Fletcher**(): [`Fletcher`](Fletcher.md)

#### Returns

[`Fletcher`](Fletcher.md)

## Properties

### Core

> `static` **Core**: \{`"Cycle"`: `Cycle`;`"Terminal"`: `Terminal`; \}

#### Cycle

> **Cycle**: *typeof* [`Cycle`](Cycle.md)

#### Terminal

> **Terminal**: *typeof* [`Terminal`](Terminal.md)

#### Source

Fletcher.ts:383

***

### Instances

> `static` **Instances**: \{`"Anon"`: `Anon`;`"EventArrowlet"`: `EventArrowlet`;`"Fun"`: `Fun`;`"Option"`: `OptionArw`;`"OptionM"`: `OptionM`;`"Then"`: `Then`;`"Unit"`: `Unit`; \}

#### Anon

> **Anon**: *typeof* `Anon`

#### EventArrowlet

> **EventArrowlet**: *typeof* `EventArrowlet`

#### Fun

> **Fun**: *typeof* `Fun`

#### Option

> **Option**: *typeof* `Option` = `OptionArw`

#### OptionM

> **OptionM**: *typeof* `OptionM`

#### Then

> **Then**: *typeof* `Then`

#### Unit

> **Unit**: *typeof* `Unit`

#### Source

Fletcher.ts:374

## Methods

### Anon()

> `static` **Anon**\<`Pi`, `Ri`\>(`fn`: (`p`: `Pi`, `cont`: [`Terminal`](Terminal.md)\<`Ri`\>) => [`Cycle`](Cycle.md)): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>

Arrow instance of lambda

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`p`: `Pi`, `cont`: [`Terminal`](Terminal.md)\<`Ri`\>) => [`Cycle`](Cycle.md) |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:82

***

### Arrow()

> `static` **Arrow**(): *typeof* `Arrow`

#### Returns

*typeof* `Arrow`

#### Source

Fletcher.ts:44

***

### Bound()

> `static` **Bound**\<`Pi`, `Ri`, `Rii`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>, `that`: [`Arrowlet`](../interfaces/Arrowlet.md)\<[`Pi`, `Ri`], `Rii`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\>

An Arrow which places the input and output of the left arrow as a tuple into the right

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
| `Rii` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |  |
| `that` | [`Arrowlet`](../interfaces/Arrowlet.md)\<[`Pi`, `Ri`], `Rii`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\>

{Arrowlet<Pi,Rii>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:238

***

### Broach()

> `static` **Broach**\<`Pi`, `Ri`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, [`Pi`, `Ri`]\>

An Arrow which produces both it's result and it's input as a result.

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, [`Pi`, `Ri`]\>

{Arrowlet<Pi,[Pi,Ri]>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:251

***

### Dispatch()

> `static` **Dispatch**\<`R`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`R`, `void`\>): (`r`: `R`) => `void`

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
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`R`, `void`\> |
  

</details

#### Returns

`Function`

##### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `r` | `R` |
  

</details

##### Returns

`void`

#### Source

Fletcher.ts:260

***

### Event()

> `static` **Event**\<`R`\>(`self`: `string`): [`Arrowlet`](../interfaces/Arrowlet.md)\<`EventTarget`, `R`\>

Produces Arrow that listend for named event

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `R` *extends* `Event` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | `string` |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`EventTarget`, `R`\>

{Arrowlet<EventTarget,R>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:122

***

### First()

> `static` **First**\<`Pi`, `Ri`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<[`Pi`, `Pi`], [`Pi`, `Ri`]\>

Runs an Arrow over the left component of a tuple.

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<[`Pi`, `Pi`], [`Pi`, `Ri`]\>

{Arrow<Pi,Ri,[Pi,Pii],[Ri,Pii]>}

#### Static

#### Memberof

Arrow

#### Source

Fletcher.ts:180

***

### FlatMap()

> `static` **FlatMap**\<`Pi`, `Ri`, `Rii`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>, `fn`: (`p`: `Ri`) => [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\>

Use the output of Arrow to produce another and run with input Pi

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
| `Rii` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |  |
| `fn` | (`p`: `Ri`) => [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\>

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:167

***

### Forward()

> `static` **Forward**\<`P`, `R`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>, `input`: `P`): `Receiver`\<`R`\>

Produces Receiver for Terminal to receive

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `P` |  |
| `R` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\> |  |
| `input` | `P` |  |
  

</details

#### Returns

`Receiver`\<`R`\>

{Receiver<R>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:110

***

### Fun1R()

> `static` **Fun1R**\<`Pi`, `Ri`\>(`fn`: (`p`: `Pi`) => `Ri`): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>

Arrow of function `fn`

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`p`: `Pi`) => `Ri` |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>

{Arrowlet<Pi,Ri>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:56

***

### Joint()

> `static` **Joint**\<`Pi`, `Ri`, `Rii`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>, `that`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Ri`, `Rii`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, [`Ri`, `Rii`]\>

An Arrow which produces the result of the left and the right arrow as a tuple

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
| `Rii` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |  |
| `that` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Ri`, `Rii`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, [`Ri`, `Rii`]\>

{Arrowlet<Pi,[Ri,Rii]>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:223

***

### Next()

> `static` **Next**\<`Pi`, `Pii`, `Piii`, `Ri`, `Rii`, `Riii`\>(`lhs`: `Arrow`\<`Pi`, `Pii`, `Ri`, `Rii`\>, `rhs`: `Arrow`\<`Ri`, `Rii`, `Piii`, `Riii`\>): `Arrow`\<`Pi`, `Pii`, `Piii`, `Riii`\>

#### Type parameters

<details>  

| Type parameter |
| :------ |
| `Pi` |
| `Pii` |
| `Piii` |
| `Ri` |
| `Rii` |
| `Riii` |
  

</details

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `lhs` | `Arrow`\<`Pi`, `Pii`, `Ri`, `Rii`\> |
| `rhs` | `Arrow`\<`Ri`, `Rii`, `Piii`, `Riii`\> |
  

</details

#### Returns

`Arrow`\<`Pi`, `Pii`, `Piii`, `Riii`\>

#### Source

Fletcher.ts:254

***

### Option()

> `static` **Option**\<`P`, `R`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Option`\<`P`\>, `Option`\<`R`\>\>

Wraps an Arrow in such a way as it takes an Option

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `P` |  |
| `R` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Option`\<`P`\>, `Option`\<`R`\>\>

{Arrowlet<O.Option<P>,O.Option<R>>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:338

***

### OptionM()

> `static` **OptionM**\<`P`, `R`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `Option`\<`R`\>\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Option`\<`P`\>, `Option`\<`R`\>\>

Turns the flatMap function of an Option into an Option Arrow.

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `P` |  |
| `R` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `Option`\<`R`\>\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Option`\<`P`\>, `Option`\<`R`\>\>

{Arrowlet<O.Option<P>,O.Option<R>>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:351

***

### OptionP()

> `static` **OptionP**\<`P`\>(`fn`: (`p`: `P`) => `boolean`): [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `Option`\<`P`\>\>

Produces Some(p) if the predicate returns true, None otherwise

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `P` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`p`: `P`) => `boolean` |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `Option`\<`P`\>\>

{Arrowlet<P,O.Option<P>>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:363

***

### Pair()

> `static` **Pair**\<`Pi`, `Pii`, `Ri`, `Rii`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>, `that`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pii`, `Rii`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<[`Pi`, `Pii`], [`Ri`, `Rii`]\>

Arrow that takes a tuple [pi,pii] and produced [ri,rii]

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Pii` |  |
| `Ri` |  |
| `Rii` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |  |
| `that` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pii`, `Rii`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<[`Pi`, `Pii`], [`Ri`, `Rii`]\>

{Arrowlet<[Pi,Pii],[Ri,Rii]>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:152

***

### Pinch()

> `static` **Pinch**\<`Pi`, `Ri`, `Rii`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>, `that`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, [`Ri`, `Rii`]\>

An Arrow which runs two Arrows with the same input

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
| `Rii` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |  |
| `that` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, [`Ri`, `Rii`]\>

{Arrowlet<Pi,[Ri,Rii]>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:208

***

### Pure()

> `static` **Pure**\<`Pi`, `Ri`\>(`r`: `Ri`): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>

Arrow that produces result `r`, no matter the input

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `r` | `Ri` |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>

{Arrowlet<Pi,Ri>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:69

***

### Race()

> `static` **Race**\<`P`, `R`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>, `that`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>

Produce the first result to arrive. Note it runs in left right order

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `P` |  |
| `R` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\> |  |
| `that` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>

{Arrowlet<P,R>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:276

***

### React()

> `static` **React**\<`R`\>(`dispatch`: `Dispatch`\<`R`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`R`, `void`\>

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
| `dispatch` | `Dispatch`\<`R`\> |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`R`, `void`\>

#### Source

Fletcher.ts:257

***

### Resolve()

> `static` **Resolve**\<`P`, `R`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>, `input`: `P`): `Promise`\<`Result`\<`R`\>\>

Runs Arrow and produces Promise result

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `P` |  |
| `R` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\> |  |
| `input` | `P` |  |
  

</details

#### Returns

`Promise`\<`Result`\<`R`\>\>

{Promise<Result<R>>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:96

***

### Second()

> `static` **Second**\<`Pi`, `Ri`, `Pii`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<[`Pi`, `Pi`], [`Pi`, `Ri`]\>

Runs an Arrow over the rignt component of a tuple

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
| `Pii` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type |
| :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<[`Pi`, `Pi`], [`Pi`, `Ri`]\>

{Arrow<Pi,Ri,[Pii,Pi],[Pii,Ri]>}

#### Static

#### Memberof

Arrow

#### Source

Fletcher.ts:193

***

### Stage()

> `static` **Stage**\<`P`, `R`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>, `before`: (`p`: `P`) => `void`, `after`: (`r`: `R`) => `void`): [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>

An Arrow which calls handler `before` with it's input adn handler `after` with it's output

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `P` |  |
| `R` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\> |  |
| `before` | (`p`: `P`) => `void` |  |
| `after` | (`r`: `R`) => `void` |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `R`\>

{Arrowlet<P,R>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:311

***

### Terminal()

> `static` **Terminal**\<`P`\>(): [`Terminal`](Terminal.md)\<`P`\>

#### Type parameters

<details>  

| Type parameter |
| :------ |
| `P` |
  

</details

#### Returns

[`Terminal`](Terminal.md)\<`P`\>

#### Source

Fletcher.ts:25

***

### Then()

> `static` **Then**\<`Pi`, `Ri`, `Rii`\>(`self`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\>, `that`: [`Arrowlet`](../interfaces/Arrowlet.md)\<`Ri`, `Rii`\>): [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\>

Arrow runs `self`, then runs `that` with it's output

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `Pi` |  |
| `Ri` |  |
| `Rii` |  |
  

</details

#### Parameters

<details>  

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Ri`\> |  |
| `that` | [`Arrowlet`](../interfaces/Arrowlet.md)\<`Ri`, `Rii`\> |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`Pi`, `Rii`\>

{Arrowlet<Pi,Rii>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:136

***

### Unit()

> `static` **Unit**\<`P`\>(): [`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `P`\>

Arrow that passed the input p to the output

#### Type parameters

<details>  

| Type parameter | Description |
| :------ | :------ |
| `P` |  |
  

</details

#### Returns

[`Arrowlet`](../interfaces/Arrowlet.md)\<`P`, `P`\>

{Arrowlet<P,P>}

#### Static

#### Memberof

Fletcher

#### Source

Fletcher.ts:41
