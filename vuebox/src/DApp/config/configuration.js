// import Web3Init from './../../utils/web3Init';
import Web3Init from 'web3-init'; //使用线上的，要记得注释掉一个reject

Web3Init.url = 'http://127.0.0.1:9545';

import file from './file.js';

export default {
	async metaCoinInit() {
		let {
			metaCoin
		} = file;
		let instance = new Web3Init({
			//参数引入合约
			artifact: metaCoin
		});
		let obj = await instance.init();
		return obj;
	}
}