export interface IServiceTracing {
	transactionId?: string;
	status? : string; 
	origen? : string;
	task?: string;
	description?: string;
	request?: string;
	method?: string;
	response?: string;
	processingTime?: number;

}
export interface IServiceTracingInicial {
	id:string,
	client?: string;
	origen : string;
	request? : string;
	channel?:string;
	method?: string;
	response?: string;
}