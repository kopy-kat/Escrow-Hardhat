import {ethers} from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);

export default async function addContract(id, contract, beneficiary, value) {
  const buttonId = `approve-${id}`;

  const container = document.getElementById("container");
  container.innerHTML += createHTML(buttonId, beneficiary, value);

  contract.on('Approved', () => {
    document.getElementById(buttonId).className = "complete";
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  document.getElementById(buttonId).addEventListener("click", async () => {
    const tracking_number = document.getElementById("tracking").value;
    url = 'https://www.dhl.com/global-en/home/tracking.html?tracking-id=' + tracking_number;
    // Fetch the url and check if parcel has really been been delivered
    const delivered = True;
    if (delivered) {
      const signer = provider.getSigner();
      await contract.connect(signer).approve();
    } else {
      console.log('Delivery not approved yet')
    }
  });
}

function createHTML(buttonId, beneficiary, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <li>
          <div> Tracking number </div>
          <div>
            <input type="text" id="tracking"/>
          </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
