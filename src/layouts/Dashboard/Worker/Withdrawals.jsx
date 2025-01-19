import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useQuery } from "@tanstack/react-query";

const Withdrawals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [totalCoins, setTotalCoins] = useState(0);
  const [withdrawCoins, setWithdrawCoins] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("Bkash");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(true);

  // Fetch total coins for the logged-in user
  const { data: userCoins = 0, isLoading: coinsLoading } = useQuery({
    queryKey: ['userCoins', user],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/earning/${user?.email}`);
      return data.coins;  // assuming the API returns total coins as 'coins'
    },
  });

  useEffect(() => {
    if (!coinsLoading) {
      setTotalCoins(userCoins);
      setCanWithdraw(userCoins >= 200);  // Check if user has enough coins (min 200)
    }
  }, [userCoins, coinsLoading]);

  // Handle the coin change for withdrawal
  const handleWithdrawCoinsChange = (e) => {
    const coins = e.target.value;
    setWithdrawCoins(coins);
    setWithdrawAmount(coins / 20); // 20 coins = 1 dollar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // If user tries to withdraw more than their available coins
    if (withdrawCoins > totalCoins) {
      Swal.fire("Error", "You do not have enough coins.", "error");
      setLoading(false);
      return;
    }

    // Prepare withdrawal data
    const withdrawalData = {
      worker_email: user.email,
      worker_name: user.displayName,
      withdrawal_coin: withdrawCoins,
      withdrawal_amount: withdrawAmount,
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date(),
      status: "pending",
    };

    try {
      // API call to create withdrawal request
      await axiosSecure.post("/Withdrawals", withdrawalData);
      Swal.fire("Success", "Your withdrawal request is submitted.", "success");
      setWithdrawCoins(0); // Reset withdrawal coin input
      setAccountNumber(""); // Reset account number field
    } catch (error) {
      Swal.fire("Error", "Failed to submit withdrawal request.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Withdraw Coins</h2>

      {/* Display user's total coins and equivalent withdrawal amount */}
      <div className="mb-4">
        <p className="text-gray-700">Total Coins: {totalCoins}</p>
        <p className="text-gray-700">Withdrawal Amount: ${withdrawAmount.toFixed(2)}</p>
      </div>

      {/* Withdrawal Form */}
      <form onSubmit={handleSubmit}>
        {/* Coin to withdraw */}
        <div className="mb-4">
          <label className="block mb-2">Coin to Withdraw:</label>
          <input
            type="number"
            min="1"
            max={totalCoins}
            value={withdrawCoins}
            onChange={handleWithdrawCoinsChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Withdrawal amount (dollar) */}
        <div className="mb-4">
          <label className="block mb-2">Withdraw Amount ($):</label>
          <input
            type="number"
            value={withdrawAmount}
            className="w-full border p-2 rounded"
            disabled
          />
        </div>

        {/* Payment system selection */}
        <div className="mb-4">
          <label className="block mb-2">Select Payment System:</label>
          <select
            value={paymentSystem}
            onChange={(e) => setPaymentSystem(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Account number field */}
        <div className="mb-4">
          <label className="block mb-2">Account Number:</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Withdraw Button */}
        <div className="mb-4">
          {canWithdraw && withdrawCoins >= 200 ? (
            <button
              type="submit"
              className="bg-green-500 text-white px-3 py-1 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          ) : (
            <p className="text-red-500">You need at least 200 coins to withdraw.</p>
          )}
        </div>

        {/* Insufficient coins error */}
        {withdrawCoins > totalCoins && (
          <p className="text-red-500">Insufficient coins for withdrawal.</p>
        )}
      </form>
    </div>
  );
};

export default Withdrawals;
