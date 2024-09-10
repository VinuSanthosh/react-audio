import React from "react";
import AccountContext from "../Context/AccountContext";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

const AccountState = (props) => {

    const getSession = async() =>{
        return await new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser();
            if(user){
                user.getSession(async(err, session)=>{
                    if(err){
                        reject(err);
                    } else{
                        resolve(session);
                    }
                })
            }
        })
    }

    const authenticate = async(UserName, Password) => {
        var authenticationData = {
            Username: UserName,
            Password: Password,
        };

        var authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        const user = new CognitoUser({
            Username: UserName,
            Pool: UserPool
        })

        return await new Promise((resolve, reject) => {
            user.authenticateUser(authenticationDetails, {
                onSuccess:(data) =>{
                    console.log("Login Success", data);
                    resolve(data);
                },
                onFailure:(err) =>{
                    console.log("error", err.message);
                    reject(err);
                }
            })
        })
    }

    return (
        <AccountContext.Provider value={{authenticate, getSession}}>
            {props.children}
        </AccountContext.Provider>
    )
}

export default AccountState;
