import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { BetOpportunity } from '../../types/betting';
import { format } from 'date-fns';
import { useBankrollStore } from '../../lib/store';

interface TradeExecutionModalProps {
  opportunity: BetOpportunity;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function TradeExecutionModal({
  opportunity,
  isOpen,
  onClose,
  onConfirm,
}: TradeExecutionModalProps) {
  const [stake, setStake] = useState(1000);
  const [acknowledgements, setAcknowledgements] = useState({
    odds: false,
    stakes: false,
    funds: false,
  });

  const { currentBankroll, allocatedFunds } = useBankrollStore();
  const totalInvestment = stake * 2;
  const potentialProfit = (stake * opportunity.profit) / 100;
  const remainingBankroll = currentBankroll - totalInvestment;

  const allAcknowledged = Object.values(acknowledgements).every(Boolean);

  const handleConfirm = () => {
    if (allAcknowledged) {
      onConfirm();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-background/70 backdrop-blur-md border border-border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold">Confirm Trade Execution</h2>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Trade Overview
                </h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Event</p>
                      <p className="font-medium">{opportunity.event}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium">
                        {format(new Date(opportunity.timestamp), 'PPp')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {opportunity.bookmaker1}
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Odds</p>
                        <p className="font-medium">{opportunity.odds1.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stake</p>
                        <p className="font-medium">${(stake / 2).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {opportunity.bookmaker2}
                  </h3>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Odds</p>
                        <p className="font-medium">{opportunity.odds2.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stake</p>
                        <p className="font-medium">${(stake / 2).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Trade Statistics
                </h3>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Investment</p>
                      <p className="font-medium">${totalInvestment.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Profit</p>
                      <p className="font-medium text-green-500">
                        ${potentialProfit.toFixed(2)} ({opportunity.profit}%)
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Bankroll</p>
                      <p className="font-medium">${currentBankroll.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining Bankroll</p>
                      <p className="font-medium">${remainingBankroll.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Adjust Total Stake
                </h3>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(Number(e.target.value))}
                    className="input flex-1"
                    min={100}
                    max={currentBankroll}
                    step={100}
                  />
                  <button
                    onClick={() => setStake(Math.floor(currentBankroll * 0.1))}
                    className="btn btn-secondary"
                  >
                    10% of Bankroll
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Risk Acknowledgment
                </h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={acknowledgements.odds}
                    onChange={(e) =>
                      setAcknowledgements({ ...acknowledgements, odds: e.target.checked })
                    }
                    className="rounded border-primary text-primary focus:ring-primary"
                  />
                  <span className="text-sm">
                    I understand that odds may change during execution
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={acknowledgements.stakes}
                    onChange={(e) =>
                      setAcknowledgements({ ...acknowledgements, stakes: e.target.checked })
                    }
                    className="rounded border-primary text-primary focus:ring-primary"
                  />
                  <span className="text-sm">
                    I confirm all stake amounts are correct
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={acknowledgements.funds}
                    onChange={(e) =>
                      setAcknowledgements({ ...acknowledgements, funds: e.target.checked })
                    }
                    className="rounded border-primary text-primary focus:ring-primary"
                  />
                  <span className="text-sm">
                    I have sufficient funds in all bookmaker accounts
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-6 border-t border-border bg-muted/50">
              <button onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!allAcknowledged}
                className="btn btn-primary"
              >
                Execute Trade
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}