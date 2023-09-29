import { FirebaseFirestore } from "@capacitor-firebase/firestore";

// by convention, composable function names start with "use"
export function useFirebase() {
  const addDocument = async (reference: string, data: object) => {
    await FirebaseFirestore.addDocument({
      reference: "users",
      data: {
        first: "Alan",
        last: "Turing",
        born: 1912,
      },
    });
  };

  const setDocument = async () => {
    await FirebaseFirestore.setDocument({
      reference: "users/Aorq09lkt1ynbR7xhTUx",
      data: {
        first: "Alan",
        last: "Turing",
        born: 1912,
      },
      merge: true,
    });
  };

  const getDocument = async () => {
    const { snapshot } = await FirebaseFirestore.getDocument({
      reference: "users/Aorq09lkt1ynbR7xhTUx",
    });
    return snapshot;
  };

  const updateDocument = async () => {
    await FirebaseFirestore.updateDocument({
      reference: "users/Aorq09lkt1ynbR7xhTUx",
      data: {
        first: "Alan",
        last: "Turing",
        born: 1912,
      },
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
      //   compositeFilter: {
      //     type: "and",
      //     queryConstraints: [
      //       {
      //         type: "where",
      //         fieldPath: "born",
      //         opStr: "==",
      //         value: 1912,
      //       },
      //     ],
      //   },
      //   queryConstraints: [
      //     {
      //       type: "orderBy",
      //       fieldPath: "born",
      //       directionStr: "desc",
      //     },
      //     {
      //       type: "limit",
      //       limit: 10,
      //     },
      //   ],
    });
    return snapshots;
  };

  const enableNetwork = async () => {
    await FirebaseFirestore.enableNetwork();
  };

  const disableNetwork = async () => {
    await FirebaseFirestore.disableNetwork();
  };

  const addDocumentSnapshotListener = async () => {
    const callbackId = await FirebaseFirestore.addDocumentSnapshotListener(
      {
        reference: "users/Aorq09lkt1ynbR7xhTUx",
      },
      (event, error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(event);
        }
      }
    );
    return callbackId;
  };

  const addCollectionSnapshotListener = async () => {
    const callbackId = await FirebaseFirestore.addCollectionSnapshotListener(
      {
        reference: "users",
        compositeFilter: {
          type: "and",
          queryConstraints: [
            {
              type: "where",
              fieldPath: "born",
              opStr: "==",
              value: 1912,
            },
          ],
        },
        queryConstraints: [
          {
            type: "orderBy",
            fieldPath: "born",
            directionStr: "desc",
          },
          {
            type: "limit",
            limit: 10,
          },
        ],
      },
      (event, error) => {
        if (error) {
          console.error(error);
        } else {
          console.log(event);
        }
      }
    );
    return callbackId;
  };

  const removeSnapshotListener = async (callbackId: string) => {
    await FirebaseFirestore.removeSnapshotListener({
      callbackId,
    });
  };

  const removeAllListeners = async () => {
    await FirebaseFirestore.removeAllListeners();
  };
  // expose managed state as return value
  return { addDocument, getCollection };
}
