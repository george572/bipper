import { FirebaseFirestore } from "@capacitor-firebase/firestore";

export function useFirebase() {
  const addDocument = async (reference: string, data: object) => {
    const dataCopy = { ...data, createdAt: new Date() };
    await FirebaseFirestore.addDocument({
      reference: reference,
      data: dataCopy
    });
  };

  const setDocument = async (reference: string) => {
    await FirebaseFirestore.setDocument({
      reference: reference,
      data: {'ae' : new Date()},
    });
  };

  const getDocument = async (reference: string) => {
    const { snapshot } = await FirebaseFirestore.getDocument({
      reference: reference,
    });
    return snapshot;
  };

  const updateDocument = async (reference: string, data: object) => {
    await FirebaseFirestore.updateDocument({
      reference: reference,
      data: data
    });
  };

  const deleteDocument = async () => {
    await FirebaseFirestore.deleteDocument({
      reference: "users/Aorq09lkt1ynbR7xhTUx",
    });
  };

  const getCollection = async (reference: string) => {
    const { snapshots } = await FirebaseFirestore.getCollection({
      reference: reference,
      queryConstraints: [
        {
          type: 'orderBy',
          fieldPath: 'createdAt',
          directionStr: 'desc',
        },
        {
          type: 'limit',
          limit: 20,
        },
      ],
    });
    return snapshots;
  };
  // expose managed state as return value
  return { addDocument, getCollection, updateDocument, setDocument, getDocument };
}
