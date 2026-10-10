// Global declarations for firebase/firestore when npm bundle declaration is omitted
declare module "firebase/firestore" {
  export interface Firestore {
    type: string;
    app: any;
    toJSON(): object;
  }

  export interface DocumentData {
    [field: string]: any;
  }

  export interface DocumentReference<T = DocumentData> {
    readonly id: string;
    readonly path: string;
    readonly parent: CollectionReference<T>;
    readonly firestore: Firestore;
  }

  export interface CollectionReference<T = DocumentData> extends Query<T> {
    readonly id: string;
    readonly path: string;
    readonly parent: DocumentReference<DocumentData> | null;
  }

  export interface Query<T = DocumentData> {
    readonly firestore: Firestore;
  }

  export interface DocumentSnapshot<T = DocumentData> {
    readonly id: string;
    readonly ref: DocumentReference<T>;
    exists(): boolean;
    data(): T | undefined;
    get(fieldPath: string): any;
  }

  export interface QueryDocumentSnapshot<T = DocumentData> extends DocumentSnapshot<T> {
    data(): T;
  }

  export interface QuerySnapshot<T = DocumentData> {
    readonly empty: boolean;
    readonly size: number;
    readonly docs: QueryDocumentSnapshot<T>[];
    forEach(callback: (result: QueryDocumentSnapshot<T>) => void): void;
  }

  export interface FieldValue {
    isEqual(other: FieldValue): boolean;
  }

  export function getFirestore(app?: any, databaseId?: string): Firestore;

  export function collection(
    firestore: Firestore,
    path: string,
    ...pathSegments: string[]
  ): CollectionReference<DocumentData>;

  export function collection(
    reference: DocumentReference<unknown>,
    path: string,
    ...pathSegments: string[]
  ): CollectionReference<DocumentData>;

  export function doc(
    firestore: Firestore,
    path: string,
    ...pathSegments: string[]
  ): DocumentReference<DocumentData>;

  export function doc<T>(
    reference: CollectionReference<T>,
    path?: string,
    ...pathSegments: string[]
  ): DocumentReference<T>;

  export function getDoc<T = DocumentData>(
    reference: DocumentReference<T>
  ): Promise<DocumentSnapshot<T>>;

  export function getDocs<T = DocumentData>(
    query: Query<T>
  ): Promise<QuerySnapshot<T>>;

  export function setDoc<T = DocumentData>(
    reference: DocumentReference<T>,
    data: Partial<T> | T,
    options?: { merge?: boolean }
  ): Promise<void>;

  export function addDoc<T = DocumentData>(
    reference: CollectionReference<T>,
    data: T
  ): Promise<DocumentReference<T>>;

  export function deleteDoc(reference: DocumentReference<unknown>): Promise<void>;

  export function query<T = DocumentData>(
    query: Query<T>,
    ...queryConstraints: any[]
  ): Query<T>;

  export function orderBy(
    fieldPath: string,
    directionStr?: "asc" | "desc"
  ): any;

  export function serverTimestamp(): FieldValue;
}
