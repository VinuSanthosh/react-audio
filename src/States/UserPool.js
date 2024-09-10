import { CognitoUserPool } from "amazon-cognito-identity-js"
import { CONFIG } from "../config/config";

const poolData = {
    UserPoolId: CONFIG.AWS_COGNITO_POOL_ID,
    ClientId: CONFIG.AWS_COGNITO_CLIENT_ID
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CognitoUserPool(poolData);
