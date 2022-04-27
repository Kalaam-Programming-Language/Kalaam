import Keyword from '../../src/lib/Compiler/constants';

export default function Data(code) { 
    return {
        code: code,
        checked:'',
        output: '',
        cm: '',
        error: [],
        OperationObjects: [],
        linebylineOutput: '',
        TimeTaken: '',
        flag:false,
        inputIndexes: [],
        isError: '',
        ExecutionStack:[],
        ExecutionStackLinebyLine:'',
        LastConditionValue: [],
        LineByLineCode: [],
        CurrentLine:0,
        Keyword:Keyword,
    };
}