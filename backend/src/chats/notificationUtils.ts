import * as admin from 'firebase-admin';

// Hardcoded creds (⚠️ insecure for real deployments)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "chatbucket-test",
      clientEmail: "firebase-adminsdk-fbsvc@chatbucket-test.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChn7Sg5k9y0qzm\nb+qkOVvyeIx3mWpACP8A/SbIP0Wr9M8hnRW5d6y70ZFi01PUvtl3ZvfguS7DwENK\ngsz+fopMRFnnUTqw+xswTMfFOpnpIafWKrbtcsIa6St41OOPVLhx910A9WEZtkgP\njYrZ813CedeyYCba8dCxf7ugIT1jAB2CosP2fO94vjd3C3EwGaxtJXY0oJ7z+Vkd\noSNtwRYk/p/IRfCdtj1NE1rQjRRfEoO6xDkU51qkdu5lMAPEnHgJTQgyBjQXR6Op\nYhb/FYrGO0c8unm/rdt2Idy0NiLqlCVLZyb7xmXOyeXGW607Mw7zcr3i9ek9YqET\n6jfv+27DAgMBAAECggEAR/dCaSCUAMcxKLxtqOlHeUxXE4wSxOeckFaodaLCxaIQ\ntuFowng4yDq092Gs4r6GO4X0WrJqUcxiyiM63xj+QJ5wv7CqJxLwlM2jaD1DOgz7\n3D+Ry2H9bxki+78jgndRV6Gy3lHkhhvls1MtoAWe2pEBS9JHitcAu4BqTY9vc4xs\nXVA8zduNFFeJMYlYt+fDB8W1vJHkg68PVDGVsOU9Ok4czOpG5ILsiOU3IhjR2i6d\nJ0pxb9Iw4FYEVNGx/0KQXh16SCkPqCXfLFVEheY4d6eoMLIQQ9Mo97j74VKEjLbP\nxSuHSr8vStaNpWUPm8ANgXQ6TKdCymVPPeL2IEBY7QKBgQDcW+Vys/Vxr4H/MBR5\ny7gyOyQhI+eGUjF+LxqN3mz6RkY5cDHIGH634aLHGB3Twiqjqj7FkEf7rDXbOSZQ\n/xi9TU6/vWIXOVS8pruhd+uoBVIQ6+XolAPlei+oacR3GJbKYpOSSgpkfgj+uTmX\n4GP1yBtrVdCzsB6NWCCGG1csPwKBgQC7w9gcz8MN1H50CTxCcc/Z9AdLEh8DGUbw\nxyMbfzj3EXaAu2cBOZo0ZHRaedim99kafu3UvA5Vu1wMpqYm5Vq/KbktWMoHpx6M\nTI1D5SOKNkQ1SmbxqYoVMIsLn1IT1f7gl5a+HLDt5ZwXruCsnW1j7PcdWJixeSz0\nmhp28TAsfQKBgQC44flu9YI3MjP1sZdcYQpYSrqTe5ZjYk7YOhkjcr0odxGwW2vJ\nIJQhH5T9SkSsSLqRuuMTy2w5wlElb5uwVXeiTFyIDxNfvOBVr+a5IO59eIlUXTf2\nnUlvncainKsT6XOKto5uLOTvT7eoUCv8O25i5tPqiIOkX14i5Q/UtNe87QKBgQCW\nrWMQO+nbf1q6425oI80YqqvvomsgoXg8YJHbzwx3uJvQUpMmeIM26CY3NPCXjO28\nRX+15/PY+LG1tUZAkG1yWpkvusDlw0bQb94tTgRnNYUm/r390H/u4TWz7fZ/1Irk\n0ME3bu7M+iV5G+1QmETgm5jzA9YFFajt4Xy7VnHCQQKBgHBvHPuB3cXYS3IdEqRX\nuq8kmI4eZ69tdFLi7gJtnJqY5CP/zHOgB6EIduB8paYLERRCq91TOBeN0tq7noIa\n6NzXxH71pkF27Nq2EEW7jxYIHulN+I1/BlA3fSni4ZUb12t56JiT7DJXD0OnDjAl\nuJF/NfrLoQvLW0xh36AM9Dna\n-----END PRIVATE KEY-----\n",
    }),
  });
}

/**
 * Send a data-only push notification via FCM
 * @param token Device FCM token
 * @param data  Arbitrary key-value data
 */
export async function sendDataNotification(
  token: string,
  data: Record<string, string>,
) {
  const message: admin.messaging.Message = {
    token,
    data, // no notification object -> data-only
  };

  return admin.messaging().send(message);
}
