// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract Escrow {
	address payable public beneficiary;
	address public depositor;

	bool public isApproved;

	constructor(address payable _beneficiary) payable {
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	event Approved(uint);

	function approve() external {
		require(msg.sender == beneficiary);
		uint balance = address(this).balance;
		beneficiary.transfer(balance);
		emit Approved(balance);
		isApproved = true;
	}
}
