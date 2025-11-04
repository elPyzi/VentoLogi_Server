export const generateCode = async (codeLength:number):Promise<string> => {
    return Math.floor(Math.random() * 9 * Math.pow(10,codeLength)).toString()
}
